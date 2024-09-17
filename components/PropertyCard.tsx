import Image from "next/image";
import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
// import { InferSchemaType } from "mongoose";
// import Property from "@/models/Property";

// type PropertiesType = InferSchemaType<typeof Property.schema>
// >;
// interface PropertyCardType {
//   property: PropertiesType;
// }

interface Property {
  _id?: string;
  owner?: string;
  name?: string;
  type?: string;
  description?: string;
  location?: {
    street: string;
    city: string;
    state?: string;
    zipcode?: string;
  };
  beds?: number;
  baths?: number;
  square_feet?: number;
  amenities?: string[];
  rates?: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info?: {
    name: string;
    email: string;
    phone: string;
  };
  images?: string[];
  is_featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
interface PropertiesType {
  property: Property;
}

const PropertyCard: React.FC<PropertiesType> = ({ property }) => {
  const displayRate = () => {
    if (property.rates?.monthly) {
      return `$${property.rates.monthly.toLocaleString()}/mo`;
    } else if (property.rates?.weekly) {
      return `$${property.rates.weekly.toLocaleString()}/wk`;
    } else if (property.rates?.nightly) {
      return `$${property.rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <Image
        src={`/images/properties/${property.images?.[0]}`}
        width="0"
        height="0"
        sizes="100vw"
        alt=""
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-indigo-500 font-bold text-right md:text-center lg:text-right">
          {displayRate()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />{" "}
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-600 text-sm mb-4">
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Weekly
          </p>
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-lg text-rose-500" />
            <span className="text-rose-500">
              {" "}
              {property.location?.city} {property.location?.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
