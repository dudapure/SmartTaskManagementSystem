

namespace SmartTaskManagementApi.Models
{
    public class TaskItem
    {
        public int TaskId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public string? Status { get; set; } // Pending, InProgress, Completed
        public string? Priority { get; set; } // Low, Medium, High
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}

