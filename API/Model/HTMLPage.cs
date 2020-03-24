using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace API.Classes
{
    public class HTMLPage
    {
        [JsonProperty(PropertyName = "Id")]
        [ForeignKey("Id")]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "Title")]
        [Required, MaxLength(150)]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "Content")]
        public string Content { get; set; }

        [JsonProperty(PropertyName = "IsActive")]
        public bool IsActive { get; set; }

        public HTMLPage()
        {

        }
    }
}