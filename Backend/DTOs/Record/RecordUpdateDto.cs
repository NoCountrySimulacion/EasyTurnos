namespace DTOs.Record
{
    public class RecordUpdateDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public Guid ClientId { get; set; }
    }
}
