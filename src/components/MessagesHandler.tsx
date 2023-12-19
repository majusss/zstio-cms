"use client";
import useSWR from "swr";
import axios from "axios";
import React from "react";

const fetcher = async () => {
  const request = await axios.get("/api/messages/get");

  return request.data;
};

export default function MessagesHandler() {
  const { data } = useSWR("/api/messages/get", fetcher);

  return (
    <div className="text-white bg-red-500 text-center">
      <h1 className="text-xl">WIADOMOŚCI</h1>
      <div className="text-white bg-red-500 w-full flex justify-around items-center flex-wrap">
        {data?.messages.map((message: Message) => (
          <div key={message.id} className="p-10 bg-slate-600 w-80 rounded-md">
            <h2>{message.message}</h2>
            <h2>{message.displayTime}</h2>
            <h2>{message.displayType}</h2>
            <h2>{message.redirectUrl}</h2>
            <h2>{message.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
