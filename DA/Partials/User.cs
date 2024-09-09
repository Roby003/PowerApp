using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Entities
{
    public partial class User
    {
        public override bool Equals(object other)
        {

            if (other == null || other is not User userObject)
                return false;
            else
                return this.Id == userObject.Id;
        }
    }
}
