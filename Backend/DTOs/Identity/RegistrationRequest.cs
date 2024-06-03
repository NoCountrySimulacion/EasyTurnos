using System.ComponentModel.DataAnnotations;

using System.Text.Json.Serialization;

namespace DTOs.Identity
{
    public class RegistrationRequest
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Phone]
        [MinLength(9, ErrorMessage = "Phone number must be at least 9 digits long.")]
        [MaxLength(15, ErrorMessage = "Phone number cannot exceed 15 digits.")]
        public string? PhoneNumber { get; set; }

        [Required]
        //[MinLength(6)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$", ErrorMessage = "The password must be at least 6 characters, including at least one capital letter, one number, and one special character")]
        public string Password { get; set; } = string.Empty;

        [Required]
        // [MinLength(6)]
        [Compare("Password", ErrorMessage = "Password and confirm password fields do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [JsonIgnore]
        public UserTypeOptions UserType { get; set; } = UserTypeOptions.Professional;

        [JsonIgnore]
        public Domain.Entities.Professional? Professional { get; set; }

        [JsonIgnore]
        public Domain.Entities.Client? Client { get; set; }
   }
}
public enum UserTypeOptions
{
    Admin, Professional, Client

}