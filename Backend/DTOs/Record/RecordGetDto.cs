namespace DTOs.Record
{
    public class RecordGetDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public Guid ClientId { get; set; }
    }
}
