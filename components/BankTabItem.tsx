"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if(id!==null){
    appwriteItemId=id;
  }
  const router = useRouter();
  //console.log('useSearchParams Id: '+id);
//   console.log('Account App Write Item ID: '+account?.appwriteItemId);
  //console.log('Tab App Write Item ID: '+appwriteItemId);
  const isActive = appwriteItemId === account?.appwriteItemId;
//   console.log('isActive: '+isActive);

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(`banktab-item dark:border-blue-600 `, {
        " border-blue-600 dark:border-white": isActive,
      })}
    >
      <p
        className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500 dark:text-white`, {
          " text-blue-600 dark:text-white": isActive,
        })}
      >
        {account.name}
      </p>
    </div>
  );
};