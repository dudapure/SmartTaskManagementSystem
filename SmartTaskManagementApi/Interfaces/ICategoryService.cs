using SmartTaskManagementApi.Models;

namespace SmartTaskManagementApi.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category> AddAsync(Category category);
        Task<bool> UpdateAsync(int id, Category category);
        Task<bool> DeleteAsync(int id);
    }
}
