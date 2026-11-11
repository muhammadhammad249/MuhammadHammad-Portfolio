// import Button from "@/components/ui/Button";
// import React from "react";

// export default function LoadMore({ onClick }) {
//   return (
//     <div className="mt-16 flex justify-center">
//       <Button variation="primary" 
//         type="button"
//         onClick={onClick}
//         className="rounded-full bg-(--primary-color) px-8 py-3 font-semibold tracking-wide text-white shadow-lg shadow-black/5 transition-colors hover:bg-[var(--accent-color)]"
//       >
//         Load More Products
//       </Button>
//     </div>
//   );
// }


import Button from "@/components/ui/Button";
import React from "react";

export default function LoadMore({ onClick, hasNext }) {

  // Agar next page nahi hai → kuch render na karo
  if (!hasNext) return null;

  return (
    <div className="mt-16 flex justify-center">
      <Button
        variation="primary"
        type="button"
        onClick={onClick}
        className="rounded-full bg-(--primary-color) px-8 py-3 font-semibold tracking-wide text-white shadow-lg shadow-black/5 transition-colors hover:bg-[var(--accent-color)]"
      >
        Load More Products
      </Button>
    </div>
  );
}
