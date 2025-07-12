namespace SmartTaskManagementApi.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string? Name { get; set; }

        public ICollection<TaskItem>? Tasks { get; set; } = new List<TaskItem>();
    }

}
