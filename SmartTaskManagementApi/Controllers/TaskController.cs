using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartTaskManagementApi.Models;
using SmartTaskManagementApi.Interfaces;
using SmartTaskManagementApi.DTOs;

namespace SmartTaskManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITaskService _taskService;

        public TaskController(ApplicationDbContext context, ITaskService taskService)
        {
            _context = context;
            _taskService = taskService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskItem task)
        {
    try
    {
        // Optional validation for user/category existence
        if (!_context.Users.Any(u => u.Id == task.UserId))
            return BadRequest("Invalid UserId.");

        if (!_context.Categories.Any(c => c.CategoryId == task.CategoryId))
            return BadRequest("Invalid CategoryId.");

        task.CreatedAt = DateTime.UtcNow;
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return Ok(task);
    }
    catch (DbUpdateException ex)
    {
        // Log full inner exception
        Console.WriteLine("🔥 DB UPDATE ERROR:");
        Console.WriteLine(ex.InnerException?.Message ?? ex.Message);

        return StatusCode(500, "An error occurred while saving the task. " + (ex.InnerException?.Message ?? ex.Message));
    }
    catch (Exception ex)
    {
        Console.WriteLine("🔥 GENERAL ERROR:");
        Console.WriteLine(ex.Message);
        return StatusCode(500, "An unexpected error occurred.");
    }
}

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _context.Tasks
                .Include(t => t.Category)
                .Include(t => t.User)
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpGet("user/{userId}/filtered")]
        public async Task<IActionResult> GetUserTasks(int userId, string? category = null, string? priority = null, string? sortBy = null)
        {
            var tasks = _context.Tasks
                .Include(t => t.Category)
                .Where(t => t.UserId == userId);

            if (!string.IsNullOrEmpty(category))
                tasks = tasks.Where(t => t.Category != null && t.Category.Name == category);

            if (!string.IsNullOrEmpty(priority))
                tasks = tasks.Where(t => t.Priority == priority);

            if (sortBy == "dueDate")
                tasks = tasks.OrderBy(t => t.DueDate);

            return Ok(await tasks.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _context.Tasks
                .Include(t => t.Category)
                .FirstOrDefaultAsync(t => t.TaskId == id);

            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPut("status/{id}")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] StatusUpdateDto dto)
        {
            Console.WriteLine($"🔁 Incoming status: {dto.Status}");
            var task = await _context.Tasks.FindAsync(id);


            if (task == null)
                return NotFound();

            task.Status = dto.Status;
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Task {task.TaskId} updated to status: '{task.Status}'");

            return Ok(task);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTasksByUserId(int userId)
        {
            var tasks = await _taskService.GetTasksByUserIdAsync(userId);
            return Ok(tasks);
        }

        [HttpGet("upcoming/{userId}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetUpcomingTasks(int userId)
        {
            var tasks = await _taskService.GetUpcomingTasksAsync(userId);
            return Ok(tasks);
        }
    }
}
