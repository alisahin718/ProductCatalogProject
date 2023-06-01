using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Config
{
    public class CategoryConfig : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(x => x.Id); //PK
            builder.Property(c => c.Name).IsRequired(); // Category ismi boş olamaz.
            builder.HasData(
                new Category()
                {
                    Id = 1,
                    Name = "Elektronik",
                    Description = "Telefon, Tablet, Bilgisayar"
                });
        }
    }
}
