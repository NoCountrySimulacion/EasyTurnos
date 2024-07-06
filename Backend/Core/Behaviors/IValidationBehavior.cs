namespace Core.Behaviors
{
    public interface IValidationBehavior<T>
    {
        Task ValidateFields(T model);
    }
}
