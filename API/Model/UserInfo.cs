using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace API.Classes
{
    public class UserInfo
    {
        [JsonProperty(PropertyName = "Id")]
        [ForeignKey("Id")]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "Name")]
        [Required, MaxLength(150)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Surname")]
        public string Surname { get; set; }

        [JsonProperty(PropertyName = "Role")]
        public string Role { get; set; }

        [JsonProperty(PropertyName = "Comments")]
        public string Comments { get; set; }

        [JsonProperty(PropertyName = "Gender")]
        [MaxLength(15)]
        public string Gender { get; set; }

        [JsonProperty(PropertyName = "Password")]
        [Required, MaxLength(50)]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "Username")]
        [Required, MaxLength(150)]
        public string Username { get; set; }

        [JsonProperty(PropertyName = "Age")]
        public int Age { get; set; }
        
        public UserInfo()
        {

        }
    }
}