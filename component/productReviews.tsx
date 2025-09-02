
"use client";

import { useState } from "react";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/store/products/product-api";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: reviews, refetch } = useGetReviewsQuery(productId);
  const [addReview] = useAddReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rating || !comment) {
      toast.error("Please provide rating and comment.");
      return;
    }

    try {
      if (editingId) {
        // Update existing review
        await updateReview({
          productId,
          reviewId: editingId,
          review: { rating, comment },
        }).unwrap();
        toast.success("Review updated!");
        setEditingId(null);
      } else {
        // Add new review
        await addReview({ productId, review: { rating, comment } }).unwrap();
        toast.success("Review added!");
      }
      setRating(0);
      setComment("");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const handleEdit = (
    reviewId: string,
    currentRating: number,
    currentComment: string
  ) => {
    setEditingId(reviewId);
    setRating(currentRating);
    setComment(currentComment);
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview({ productId, reviewId }).unwrap();
      toast.success("Review deleted!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Reviews</h2>

      {reviews?.map((r) => (
        <div key={r._id} className="border-b py-2">
          <div className="flex items-center justify-between">
            <div className="flex text-yellow-500">
              {Array(r.rating)
                .fill(0)
                .map((_, i) => (
                  <IoMdStar key={i} />
                ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 rounded-lg text-white font-medium 
               bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
               hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 
               transition-all duration-300 shadow-md"
                onClick={() => handleEdit(r._id, r.rating, r.comment)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 rounded-lg text-white font-medium 
               bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 
               hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 
               transition-all duration-300 shadow-md"
                onClick={() => handleDelete(r._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <p>{r.comment}</p>
          <small className="text-gray-500">by {r.user.name}</small>
        </div>
      ))}

      <div className="mt-4 border-t pt-2">
        <h3 className="text-sm font-semibold mb-1">
          {editingId ? "Edit Your Review" : "Add a Review"}
        </h3>
        <select
          className="border rounded w-full px-2 py-1 mb-2 text-sm"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>Rate</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <textarea
          className="border rounded w-full px-2 py-1 mb-2 text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold rounded-3xl px-4 py-2 text-sm hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          {editingId ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
