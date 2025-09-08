"use client";

import { useState, useEffect } from "react";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/store/products/product-api";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/hook";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAppSelector((state) => state.auth);

  // Fetch reviews
  const { data: reviews = [], refetch } = useGetReviewsQuery(productId);

  // Mutations
  const [addReview, { isLoading: adding }] = useAddReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  // Local state for form
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (editingId) {
      const review = reviews.find((r) => r._id === editingId);
      if (review) {
        setRating(review.rating);
        setComment(review.comment);
      }
    }
  }, [editingId, reviews]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    if (!rating || !comment) {
      toast.error("Please provide rating and comment.");
      return;
    }

    try {
      if (editingId) {
        await updateReview({
          productId,
          reviewId: editingId,
          review: { rating, comment },
        }).unwrap();
        toast.success("Review updated!");
        setEditingId(null);
      } else {
        await addReview({ productId, review: { rating, comment } }).unwrap();
        toast.success("Review added!");
      }
      setRating(0);
      setComment("");
      refetch(); // Refresh reviews immediately
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const handleEdit = (reviewId: string) => setEditingId(reviewId);

  const handleDelete = async (reviewId: string) => {
    if (!user) return;

    try {
      await deleteReview({ productId, reviewId }).unwrap();
      toast.success("Review deleted!");
      if (editingId === reviewId) setEditingId(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((r) => (
        <div key={r._id} className="border-b py-2">
          <div className="flex items-center justify-between">
            <div className="flex text-yellow-500">
              {Array(r.rating)
                .fill(0)
                .map((_, i) => (
                  <IoMdStar key={i} />
                ))}
            </div>

            {user?._id === r.user._id && (
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold 
                    rounded-2xl px-3 py-1 text-xs hover:opacity-90 transition"
                  onClick={() => handleEdit(r._id)}
                  disabled={updating}
                >
                  Edit
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold 
                    rounded-2xl px-3 py-1 text-xs hover:opacity-90 transition"
                  onClick={() => handleDelete(r._id)}
                  disabled={deleting}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="mt-1">{r.comment}</p>
          <small className="text-gray-500">by {r.user.name}</small>
        </div>
      ))}

      {user ? (
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
            className="bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold 
              rounded-3xl px-4 py-2 text-sm hover:opacity-90 transition"
            onClick={handleSubmit}
            disabled={adding}
          >
            {editingId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          Please log in to add a review.
        </p>
      )}
    </div>
  );
}
