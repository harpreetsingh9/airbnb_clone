import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  roomCount?: number;
  bathroomCount?: string;
  guestCount?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;
    let query: any = {};

    if (category) {
      query.category = category;
    }
    if (userId) {
      query.userId = userId;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
