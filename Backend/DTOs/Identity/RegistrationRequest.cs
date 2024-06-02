﻿using System.ComponentModel.DataAnnotations;

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
      [MinLength(6)]
      public string Password { get; set; } = string.Empty;

      public UserTypeOtions UserType { get; set; } = UserTypeOtions.Professional;
   }
}
public enum UserTypeOtions
{
   Admin, Professional, Client

}