"use client";

import React, { useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchUserQuery } from "@/store/Features/auth/auth-api";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/store/products/product-api";

interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: ReviewUser | string;
}

interface CurrentUser {
  _id?: string;
  id?: string;
  name?: string;
}

export default function Reviews({ productId }: { productId: string }) {
  const { data: userData } = useFetchUserQuery();
  const user = userData?.data as CurrentUser | undefined;
  const userId = user?._id ?? user?.id;

  const { data: reviews = [], refetch } = useGetReviewsQuery(productId);

  const [addReview] = useAddReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  useEffect(() => {
    if (editingReviewId) {
      const reviewToEdit = (reviews as Review[]).find(
        (r) => r._id === editingReviewId
      );
      if (reviewToEdit) {
        setRating(reviewToEdit.rating);
        setComment(reviewToEdit.comment);
      }
    } else {
      setRating(0);
      setComment("");
    }
  }, [editingReviewId, reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment) return;

    try {
      if (editingReviewId) {
        await updateReview({
          productId,
          reviewId: editingReviewId,
          review: { rating, comment },
        }).unwrap();
        toast.success("Review updated successfully!");
        setEditingReviewId(null);
      } else {
        await addReview({
          productId,
          review: { rating, comment },
        }).unwrap();
        toast.success("Review added successfully!");
      }
      setRating(0);
      setComment("");
      refetch(); // refresh reviews
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const handleEdit = (id: string) => setEditingReviewId(id);

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview({ productId, reviewId }).unwrap();
      toast.success("Review deleted successfully!");
      if (editingReviewId === reviewId) setEditingReviewId(null);
      refetch(); // refresh reviews
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <IoMdStar
              key={star}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold rounded-2xl px-4 py-2 hover:opacity-90 transition"
        >
          {editingReviewId ? "Update Review" : "Add Review"}
        </button>
      </form>

      {(reviews as Review[]).map((r) => {
        const reviewUserId =
          typeof r.user === "string" ? r.user : r.user._id;
        const reviewUserName =
          typeof r.user === "string" ? "Unknown" : r.user.name;

        return (
          <div key={r._id} className="border-b py-2">
            <div className="flex items-center justify-between">
              <div className="flex text-yellow-500">
                {Array(r.rating)
                  .fill(0)
                  .map((_, i) => (
                    <IoMdStar key={i} />
                  ))}
              </div>

              {userId && String(userId) === String(reviewUserId) && (
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold rounded-2xl px-3 py-1 text-xs hover:opacity-90 transition"
                    onClick={() => handleEdit(r._id)}
                    disabled={updating}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold rounded-2xl px-3 py-1 text-xs hover:opacity-90 transition"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <p className="mt-1">{r.comment}</p>
            <small className="text-gray-500">by {reviewUserName}</small>
          </div>
        );
      })}
    </div>
  );
}
