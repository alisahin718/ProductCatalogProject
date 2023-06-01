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
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(
                new User()
                {
                    Id = "1",
                    FirstName = "denemeAd",
                    LastName = "denemeSoyad",
                    Gender = (Gender)1,
                    UserName = "deneme1",
                    NormalizedUserName = "DENEME1",
                    Email ="deneme@outlook.com",
                    NormalizedEmail ="DENEME@OUTLOOK.COM",
                    EmailConfirmed = true,
                    PasswordHash = "denemePassHash",
                    SecurityStamp ="0",
                    ConcurrencyStamp ="1",
                    PhoneNumber ="05123456789",
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    AccessFailedCount = 1
                },
                new User()
                {
                    Id = "2",
                    FirstName = "denemeAd2",
                    LastName = "denemeSoyad2",
                    Gender = (Gender)1,
                    UserName = "deneme2",
                    NormalizedUserName = "DENEME2",
                    Email = "deneme2@outlook.com",
                    NormalizedEmail = "DENEME2@OUTLOOK.COM",
                    EmailConfirmed = true,
                    PasswordHash = "denemePassHash",
                    SecurityStamp = "0",
                    ConcurrencyStamp = "1",
                    PhoneNumber = "05223456789",
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    AccessFailedCount = 1
                }
                );
        }
    }
}
