import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

const API_ENDPOINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create(
  persist(
    (set) => ({
      isLoading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      createRestaurant: async (formData: FormData) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);

          if (response.data.success) {
            toast.success(response.data.message);
            set({ isLoading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ isisLoading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ isLoading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);
          if (response.data.success) {
            set({ isLoading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ isLoading: false });
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ isLoading: true });
          const response = await axios.put(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ isLoading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ isLoading: false });
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          // await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ loading: false, searchedRestaurant: response.data });
          }
        } catch (error) {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "restaurant",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
