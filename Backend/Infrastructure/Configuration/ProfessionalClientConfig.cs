using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Infrastructure.Configuration;

public class ProfessionalClientConfig : IEntityTypeConfiguration<ProfessionalClient>
{
    public void Configure(EntityTypeBuilder<ProfessionalClient> builder)
    {
        builder.HasKey(pc => new { pc.ProfessionalId, pc.ClientId });

        builder.Ignore(pc => pc.Id);

        builder
            .HasOne(pc => pc.Professional)
            .WithMany(p => p.ProfessionalClients)
            .HasForeignKey(pc => pc.ProfessionalId);

        builder
            .HasOne(pc => pc.Client)
            .WithMany(c => c.ProfessionalClients)
            .HasForeignKey(pc => pc.ClientId);
    }
}