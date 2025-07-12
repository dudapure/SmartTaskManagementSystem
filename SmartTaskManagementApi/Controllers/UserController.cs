using Microsoft.AspNetCore.Mvc;
using SmartTaskManagementApi.Interfaces;
using SmartTaskManagementApi.Models;
using SmartTaskManagementApi.DTOs;


namespace SmartTaskManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.Email))
            {
                return BadRequest("Username, Password, and Email are required.");
            }

            if (_userService.UserExists(user.Email))
            {
                return BadRequest("User already exists.");
            }

            bool isRegistered = _userService.Register(user);


            if (isRegistered)
            {
                return Ok(new { message = "User registered successfully!" });
            }

            return BadRequest("User already exists.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            try
            {

                var authenticateResponse = _userService.Authenticate(loginModel);


                if (authenticateResponse == null)
                {
                    return Unauthorized("User not found.");
                }


                return Ok(new
                {
                    token = authenticateResponse.Token,
                    user = new
                    {
                        authenticateResponse.User.Id,
                        authenticateResponse.User.UserName,
                        authenticateResponse.User.Email,
                        authenticateResponse.User.Role
                    }
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error during login: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpGet("details")]
        public async Task<IActionResult> GetAllUserDetails()
        {
            var users = await _userService.GetAllUserDetailsAsync();
            return Ok(users);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpPut("toggle-active/{id}")]
        public async Task<IActionResult> ToggleActiveStatus(int id)
        {
            var result = await _userService.ToggleActiveStatusAsync(id);
            if (!result.success)
                return NotFound();

            return Ok(new { isActive = result.isActive });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var result = await _userService.ChangePasswordAsync(dto);
            if (!result)
                return BadRequest(new { message = "Old password is incorrect or user not found." });

            return Ok(new { message = "Password changed successfully." });
        }

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var success = await _userService.UpdateProfileAsync(dto);
            if (!success)
                return NotFound(new { message = "User not found." });

            return Ok(new { message = "Profile updated successfully." });
        }

    }
}
