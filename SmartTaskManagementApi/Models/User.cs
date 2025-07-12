namespace SmartTaskManagementApi.Models

{
    public class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; } = string.Empty;
        public string? PasswordHash { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<TaskItem>? Tasks { get; set; }
         public bool IsActive { get; set; } = true;
    }
}