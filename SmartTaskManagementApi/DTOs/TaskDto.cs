namespace SmartTaskManagementApi.DTOs
{
    public class TaskDto
    {
        public int TaskId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? CategoryName { get; set; }
        public string? UserEmail { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
