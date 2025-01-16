namespace DTOs.Record
{
    public class RecordAddDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public Guid ClientId { get; set; }
    }
}
