"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import useProductStore from "@/pages/ProductStore";

export default function CommentComponent() {
  const { reviews, products, addAdminReply } = useProductStore();
  const [selectedComment, setSelectedComment] = useState(null);

  const sortedReviews = reviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Limit to 3 reviews for the preview

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {sortedReviews.map((review) => (
          <CommentItem
            key={review.id}
            review={review}
            product={products.find(p => p.id === review.productId)}
            onViewDetails={() => setSelectedComment(review)}
          />
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View All Comments
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full md:max-w-4xl h-3/4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">All Comments</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full p-6">
              {reviews.map((review) => (
                <CommentItem
                  key={review.id}
                  review={review}
                  product={products.find(p => p.id === review.productId)}
                  onViewDetails={() => setSelectedComment(review)}
                />
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function CommentItem({ review, product, onViewDetails }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <div className="col-span-2 flex sm:flex">
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            {review.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-8 sm:col-span-6 grid gap-1">
        <p className="text-sm font-medium leading-none">{review.username}</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? "fill-primary stroke-primary"
                  : "fill-muted stroke-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="text-sm line-clamp-2 overflow-ellipsis overflow-hidden">
          {review.comment}
        </div>
      </div>
      <div className="col-span-2 sm:col-span-4 ml-auto text-right text-sm font-small leading-none">
        <div className="flex flex-col">
          <div>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(review.date))}
          </div>
          <div>
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(review.date))}
          </div>
        </div>
        <div className="col-span-12 my-2 sm:col-span-4 ml-auto text-right">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"} className="text-sm">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full md:max-w-2xl">
              <CommentDetails review={review} product={product} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="col-span-12 my-4" />
    </div>
  );
}

function CommentDetails({ review, product }) {
  const { addAdminReply } = useProductStore();
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (replyText.trim()) {
      addAdminReply(review.id, replyText);
      setReplyText('');
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <DialogHeader>
        <DialogTitle>Comment Details</DialogTitle>
      </DialogHeader>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {review.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold leading-none">
                  {review.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(review.date))}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? "fill-primary stroke-primary"
                      : "fill-muted stroke-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {product && (
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                  <p className="text-sm text-muted-foreground">Price: ${product.price}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h4 className="text-sm font-semibold">User Comment</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{review.comment}</p>
            </CardContent>
          </Card>

          {review.adminReply && (
            <Card className="bg-secondary">
              <CardHeader>
                <h4 className="text-sm font-semibold">Admin Reply</h4>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.adminReply}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
      <div className="mt-2 p-4 border-t">
        <div className="flex items-center space-x-2">
          <Textarea
            placeholder="Type your reply here..."
            className="flex-grow"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={2}
          />
          <Button onClick={handleReply} disabled={!replyText.trim()}>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}