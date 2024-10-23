"use client";

import { useAccount } from "@starknet-react/core";
import { table } from "console";
import type { NextPage } from "next";
import { useState } from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const Home: NextPage = () => {
  const [transferAmount, setTransferAmount] = useState(0);
  const [targetAddress, setTargetAddress] = useState("");

  const { address, isConnected } = useAccount();

  const { data: balanceData, isLoading } = useScaffoldReadContract({
    contractName: "Eth",
    functionName: "balance_of",
    args: [address],
    enabled: isConnected,
  });

  const { sendAsync: transfer } = useScaffoldWriteContract({
    contractName: "Eth",
    functionName: "transfer",
    args: [targetAddress, transferAmount * 10 ** 18],
  });

  const { sendAsync: approveAndTransfer } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [targetAddress, transferAmount * 10 ** 18],
      },
      {
        contractName: "Eth",
        functionName: "transfer",
        args: [targetAddress, transferAmount * 10 ** 18],
      },
    ],
  });

  return (
    <>
      <div className="flex items-center justify-center gap-3 flex-grow pt-10">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Read ETH Balance Demo</h2>
            {!isConnected && <p>Wallet is not connected!</p>}
            {isConnected &&
              (isLoading ? (
                <p>Loading...</p>
              ) : (
                <p>{Number(balanceData || 0n) / 10 ** 18} ETH</p>
              ))}
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
                onChange={(e) => setTargetAddress(e.target.value)}
              />
              <input
                type="number"
                step="0.001"
                placeholder="Amount in ETH"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setTransferAmount(Number(e.target.value))}
              />
              <button
                className="btn btn-primary"
                onClick={() => approveAndTransfer()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Event listener on transfer</h2>
            <div className="flex flex-col gap-2">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>XXXXX</td>
                    <td>XXXXX</td>
                    <td>XXXXX ETH</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
