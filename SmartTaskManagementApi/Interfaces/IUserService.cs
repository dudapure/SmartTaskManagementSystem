using SmartTaskManagementApi.Models;
using SmartTaskManagementApi.DTOs;


namespace SmartTaskManagementApi.Interfaces
{
    public interface IUserService
    {
        bool UserExists(string email);
        AuthenticateModel Authenticate(LoginModel login);
        bool Register(User user);
        IEnumerable<User> GetAllUsers();
        Task<List<UserDto>> GetAllUserDetailsAsync();
        Task<bool> DeleteUserAsync(int userId);
        Task<(bool success, bool isActive)> ToggleActiveStatusAsync(int userId);
        Task<bool> ChangePasswordAsync(ChangePasswordDto dto);
        Task<bool> UpdateProfileAsync(UpdateProfileDto dto);
    }
}