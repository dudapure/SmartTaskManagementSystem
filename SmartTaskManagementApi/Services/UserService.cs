using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SmartTaskManagementApi.Interfaces;
using SmartTaskManagementApi.Models;
using SmartTaskManagementApi.DTOs;
using Microsoft.EntityFrameworkCore;



namespace SmartTaskManagementApi.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public bool UserExists(string email)
        {
            return _dbContext.Users.Any(u => u.Email == email);
        }

        public AuthenticateModel Authenticate(LoginModel login)
        {
            Console.WriteLine("Authenticate method called for email: " + login.Email);

            var user = _dbContext.Users.SingleOrDefault(u => u.Email == login.Email);
            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found.");
            }

            bool isPasswordValid = false;
            try
            {
                isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during bcrypt verification: " + ex.Message);
            }

            if (!isPasswordValid)
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT key is not configured.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                    new Claim(ClaimTypes.Role, user.Role ?? string.Empty),
                    new Claim("Email", user.Email ?? string.Empty)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticateModel
            {
                Token = tokenHandler.WriteToken(token),
                User = user
            };
        }

        public bool Register(User user)
        {
            if (_dbContext.Users.Any(u => u.Email == user.Email))
            {
                return false;
            }

            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "user";
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return true;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _dbContext.Users.Where(u => u.Role!.ToLower() == "user")
        .ToList();
        }

        public async Task<List<UserDto>> GetAllUserDetailsAsync()
        {
            var users = await _dbContext.Users
             .Where(u => u.Role!.ToLower() == "user")
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.UserName!,
                    Email = u.Email ?? string.Empty,
                    Role = u.Role ?? string.Empty,
                    CreatedAt = u.CreatedAt,
                    TotalTasks = _dbContext.Tasks.Count(t => t.UserId == u.Id),
                    IsActive = u.IsActive
                })
                .ToListAsync();

            return users ?? new List<UserDto>();
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
                return false;

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<(bool success, bool isActive)> ToggleActiveStatusAsync(int userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
                return (false, false);

            if (user.Role?.ToLower() == "admin")
                return (false, false);

            user.IsActive = !user.IsActive;
            await _dbContext.SaveChangesAsync();

            return (true, user.IsActive);
        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordDto dto)
        {
            var user = await _dbContext.Users.FindAsync(dto.UserId);
            if (user == null) return false;

            var isMatch = BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash);
            if (!isMatch) return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateProfileAsync(UpdateProfileDto dto)
        {
            var user = await _dbContext.Users.FindAsync(dto.Id);
            if (user == null) return false;

            user.UserName = dto.UserName;
            user.Email = dto.Email;

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
