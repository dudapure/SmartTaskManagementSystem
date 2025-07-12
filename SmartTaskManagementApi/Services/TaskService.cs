using Microsoft.EntityFrameworkCore;
using SmartTaskManagementApi.Interfaces;
using SmartTaskManagementApi.Models;
using SmartTaskManagementApi.DTOs;


namespace SmartTaskManagementApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskDto>> GetTasksByUserIdAsync(int userId)
        {
            return await _context.Tasks
                .Include(t => t.Category)
                .Include(t => t.User)
                .Where(t => t.UserId == userId)
                .Select(t => new TaskDto
                {
                    TaskId = t.TaskId,
                    Title = t.Title,
                    Description = t.Description,
                    CategoryName = t.Category != null ? t.Category.Name : null,
                    UserEmail = t.User != null ? t.User.Email : null,
                    Status = t.Status,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt
                })
                .ToListAsync();
        }


        public async Task<IEnumerable<TaskDto>> GetUpcomingTasksAsync(int userId)
        {
            var today = DateTime.Today;

            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId && t.DueDate > today && t.Status != "Completed")
                .Include(t => t.Category)
                .Include(t => t.User)
                .Select(t => new TaskDto
                {
                    TaskId = t.TaskId,
                    Title = t.Title,
                    Status = t.Status,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    CategoryName = t.Category!.Name,
                    UserEmail = t.User!.Email
                })
                .ToListAsync();

            return tasks;
        }

    }
}
