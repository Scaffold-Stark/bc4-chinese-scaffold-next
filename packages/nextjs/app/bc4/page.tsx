"use client";

import { p } from "@starknet-react/core/dist/index-DOtHQdsr";
import src from "daisyui";
import type { NextPage } from "next";
import { type } from "os";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-3 flex-grow pt-10">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Read ETH Balance Demo</h2>
            <p>XXXXXXX ETH</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Transfer ETH Balance Demo</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Destination"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="number"
                step="0.001"
                placeholder="Amount in ETH"
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
