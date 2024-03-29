"use client";
import Listings from "@/components/SearchPage/Listings";
import SearchBar from "@/components/SearchPage/SearchBar";
import { BACKEND_URL } from "@/constants";
import { Center, Container } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function SearchPage() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingListings, setLoadingListings] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoadingListings(true);

    const homeType = searchParams.get("homeType") || "apartment";
    const listingType = searchParams.get("listingType") || "sale";
    const city = searchParams.get("city") || "";

    fetch(
      `${BACKEND_URL}/listing?page=${page}&homeType=${homeType}&listingType=${listingType}&city=${city}`
    )
      .then((response) => response.json())
      .then((data) => setListings(data.listings));
    setLoadingListings(false);
  }, [searchParams, page]);

  return (
    <>
      <Container maxW={"7xl"}>
        <Suspense fallback={<Center>Loading...</Center>}>
          <SearchBar searchParams={searchParams} />
        </Suspense>
        {loadingListings ? <Center>Loading...</Center> : null}
        <Listings listings={listings} />
      </Container>
    </>
  );
}
