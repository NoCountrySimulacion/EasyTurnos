using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Utilities.Enums;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Professional> Professionals { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ProfessionalClient> ProfessionalClients { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Slot> Slots { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


            //Records
            modelBuilder.Entity<Record>()
                .HasOne(r => r.Professional)
                .WithMany(p => p.Records)
                .HasForeignKey(r => r.ProfessionalId);

            modelBuilder.Entity<Record>()
                .HasOne(r => r.Client)
                .WithMany(c => c.Records)
                .HasForeignKey(r => r.ClientId);

            //Appointments
            modelBuilder.Entity<Appointment>()
                .Property(a => a.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Appointment>()
                .HasOne(p => p.Professional)
                .WithMany(a => a.Appointments)
                .HasForeignKey(p => p.ProfessionalId);

            modelBuilder.Entity<Appointment>()
                .HasOne(c => c.Client)
                .WithMany(a => a.Appointments)
                .HasForeignKey(c => c.ClientId);

            modelBuilder.Entity<Appointment>()
                .HasOne(pa => pa.Payment)
                .WithOne(a => a.Appointment)
                .HasForeignKey<Appointment>(pa => pa.PaymentId);

            //Slots
            modelBuilder.Entity<Slot>()
                .Property(a => a.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Slot>()
                .HasOne(p => p.Professional)
                .WithMany(s => s.Slots)
                .HasForeignKey(p => p.ProfessionalId);

            //Payments
            modelBuilder.Entity<Payment>()
                .Property(pa => pa.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasAnnotation("MinValue", 0);

            modelBuilder.Entity<Payment>()
                .Property(pa => pa.PaymentMethod)
                .IsRequired();

            modelBuilder.Entity<Payment>()
                .HasOne(a => a.Appointment)
                .WithOne(pa => pa.Payment)
                .HasForeignKey<Payment>(a => a.AppointmentId);
        }
    }
}
