"use client";

import React from "react";
import Button from "@/components/ui/Button";

/**
 * StarDisplay Component
 */
function StarDisplay({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`text-sm ${i < rating ? "text-(--accent-color)" : "text-(--accent-color)/25"
                        }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

/**
 * RatingBar Component
 */
function RatingBar({ stars, count, total }) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div className="flex items-center gap-3">
            <span className="w-8 text-sm text-(--text-color)">{stars}★</span>
            <div className="flex-1 h-2 rounded-full bg-(--divider-color) overflow-hidden">
                <div
                    className="h-full bg-(--accent-color) rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-8 text-right text-xs text-(--text-color)/70">{count}</span>
        </div>
    );
}

/**
 * ReviewCard Component
 */
function ReviewCard({ review }) {
    return (
        <div className="border-b border-(--divider-color) py-6 last:border-b-0">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-(--primary-color) flex items-center justify-center text-(--white-color) font-semibold text-sm">
                        {review.author.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-(--primary-color)">{review.author}</span>
                            {review.verified && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-(--accent-color)/10 px-2 py-0.5 text-xs font-medium text-(--accent-color)">
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Verified
                                </span>
                            )}
                        </div>
                        <StarDisplay rating={review.rating} />
                    </div>
                </div>

                <span className="text-xs text-(--text-color)/50">{review.date}</span>
            </div>

            <h4 className="mt-3 font-semibold text-(--primary-color)">{review.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-(--text-color)">{review.content}</p>

            <div className="mt-3 flex items-center gap-4">
                <button className="flex items-center gap-1 text-xs text-(--text-color)/70 hover:text-(--accent-color) transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    Helpful
                </button>
            </div>
        </div>
    );
}

/**
 * CustomerReviews Component
 * 
 * Displays customer reviews with rating breakdown, 
 * average rating, and individual review cards.
 */
export default function CustomerReviews({
    averageRating = 4.9,
    totalReviews = 128,
    ratingBreakdown = { 5: 98, 4: 22, 3: 5, 2: 2, 1: 1 },
    reviews = [],
}) {
    // Default sample reviews
    const defaultReviews = [
        {
            id: 1,
            author: "Esmeralda Beauchêne",
            verified: true,
            rating: 5,
            date: "2 days ago",
            title: "Absolutely transformative!",
            content: "I've struggled with dull skin for years. After just one week of using this elixir, my skin is glowing and feels incredibly smooth. The scent is incredibly soothing and luxurious. Highly recommend!",
        },
        {
            id: 2,
            author: "James Wilson",
            verified: true,
            rating: 5,
            date: "1 week ago",
            title: "Luxury at its finest",
            content: "Beautiful packaging and even better product. It absorbs quickly and doesn't leave my face feeling oily. I've become my complete part of my nighttime routine.",
        },
    ];

    const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

    return (
{/* 
        <section className="py-16">
            <h2 className="font-accent text-2xl font-semibold text-(--primary-color) md:text-3xl">
                Customer Reviews
            </h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
                <div className="rounded-2xl border border-(--divider-color) bg-(--white-color) p-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-(--primary-color)">{averageRating}</div>
                        <div className="mt-2 flex justify-center">
                            <StarDisplay rating={Math.round(averageRating)} />
                        </div>
                        <p className="mt-1 text-sm text-(--text-color)/70">
                            Based on {totalReviews} reviews
                        </p>
                    </div>

                    <div className="mt-6 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <RatingBar
                                key={stars}
                                stars={stars}
                                count={ratingBreakdown[stars] || 0}
                                total={totalReviews}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        fullWidth
                        className="mt-6"
                    >
                        Write a Review
                    </Button>
                </div>

                <div>
                    {displayReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
        */}
    );
}
