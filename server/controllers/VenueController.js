'use strict';

import Venue from '../models/Venue';

export async function createVenue(event) {
  const { venue } = event;

  if (!venue.id) return;

  const venueRes = await Venue.find({_id: venue.id});
  if (venueRes.length) return;

  const { metroArea } = venue;

  const venueData = {
    _id: venue.id,
    name: venue.displayName,
    country: metroArea.country ? metroArea.country.displayName : null,
    city: metroArea.displayName,
    state: metroArea.state ? metroArea.state.displayName : null,
    uri: venue.uri
  };

  let createVenueRes = await Venue.create(venueData);
  return createVenueRes;
}
