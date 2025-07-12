using SmartTaskManagementApi.Models;
using SmartTaskManagementApi.DTOs;


namespace SmartTaskManagementApi.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskDto>> GetTasksByUserIdAsync(int userId);
        Task<IEnumerable<TaskDto>> GetUpcomingTasksAsync(int userId);
        
    }
}
