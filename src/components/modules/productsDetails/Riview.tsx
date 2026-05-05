"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, Send, User, Mail, X, Loader2 } from "lucide-react";

type Rating = {
  id: number;
  item_id: number;
  rating: number;
  review: string;
  name: string;
  email: string;
  created_at?: string;
};

type Props = {
  itemId: number;
};

export const Review = ({ itemId }: Props) => {
  const [reviews, setReviews] = useState<Rating[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} day${diffInHours >= 48 ? 's' : ''} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Fetch reviews from backend
  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${itemId}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError("Unable to load reviews. Please try again later.");
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async () => {
    if (!reviewText.trim() || !name.trim() || !email.trim() || rating === 0) {
      setError("Please fill in all fields and select a rating.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newReview = {
        item_id: itemId,
        rating,
        review: reviewText.trim(),
        name: name.trim(),
        email: email.trim(),
      };
      console.log("Submitting review:", newReview);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        }
      );

      if (!res.ok) throw new Error("Failed to submit review");

      // Reset form
      setReviewText("");
      setName("");
      setEmail("");
      setRating(0);

      // Refresh reviews
      await fetchReviews();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setReviewText("");
    setRating(0);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Reviews</h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-lg font-medium text-gray-900">
              {reviews.length > 0
                ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                : "0.0"
              }
            </span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Write Review Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share your experience</h3>

        <div className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-900/30 rounded"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-8 h-8 ${star <= (hoverRating || rating)
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                      } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">
                {hoverRating > 0 ? hoverRating : rating || 0} out of 5
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Your Review</label>
            <textarea
              rows={4}
              placeholder="Share your thoughts about this product..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all outline-none resize-none"
            />
            <p className="text-xs text-gray-500">
              Press Ctrl+Enter (or Cmd+Enter on Mac) to submit
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !reviewText.trim() || !name.trim() || !email.trim() || rating === 0}
              className="px-6 cursor-pointer py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 cursor-pointer" />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Reviews ({reviews.length})
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-gray-500">
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
            <p className="text-gray-600 max-w-sm mx-auto">
              Be the first to share your thoughts about this product!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="font-semibold text-gray-700 text-lg">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <span>•</span>
                        <span>{formatDate(review.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};