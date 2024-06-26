import { BACKEND_URL } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";
export interface PaginationInfo {
  previous_page: number;
  current_page: number;
  next_page: number;
  total_pages: number;
  records_on_page: number;
  total_records: number;
}

export default function useGetListings() {
  const [listings, setListings] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(
    {} as PaginationInfo
  );
  const [loadingListings, setLoadingListings] = useState(false);

  const getListings = async (
    page: number,
    posterId?: string,
    searchParams?: URLSearchParams
  ) => {
    setLoadingListings(true);
    let url = `${BACKEND_URL}/listing?page=${page}`;
    if (posterId) {
      url += `&posterId=${posterId}`;
    }
    if (searchParams) {
      url += `&${searchParams.toString()}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setListings(data.listings);
        setPaginationInfo(data.pagination);
      })
      .catch((error) => {
        console.error("[useGetListings] Failed to get listings:", error);
        toast.error("Failed to get listings");
      });
    setLoadingListings(false);
  };

  return { listings, loadingListings, getListings, paginationInfo };
}
