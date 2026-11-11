// import Link from "next/link";
// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";
// import BlogCard from "@/components/layout/Blog/BlogCard";
// import { ALL_POSTS } from "@/lib/blogData";

// export default function OurBlog() {
//   const posts = ALL_POSTS.slice(0, 3);

//   return (
//     <section className="our-blog pt-24 pb-16">
//       <div className="container mx-auto px-4">
//         {/* Header row */}
//         <div className="section-row mb-10 flex flex-col gap-6 lg:flex-row lg:items-center">
//           <div className="w-full lg:w-1/2">
//             <div className="section-title m-4 p-7">
//               <FaderInAnimation direction="up">
//                 <h3 className="text-sm font-semibold capitalize text-(--primary-color) font-default tracking-[0.2em]">
//                   Aktuelle Blogbeiträge
//                 </h3>
//               </FaderInAnimation>
//               <RevealInAnimation>
//                 <h2
//                   className="text-anime-style-2 font-default text-(--primary-color) text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
//                   data-cursor="-opaque"
//                 >
//                   Einblicke, Trends und{" "}
//                   <span className="block font-accent font-light italic">
//                     Experten-Tipps
//                   </span>
//                 </h2>
//               </RevealInAnimation>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2">
//             <div className="section-btn flex justify-start lg:justify-end">
//               <Link
//                 href="/blog"
//                 className="btn-default inline-flex rounded-full px-6 py-2 text-sm font-semibold bg-(--accent-color) text-(--white-color) transition"
//               >
//                 Alle Artikel anzeigen
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Posts grid */}
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post, idx) => (
//             <BlogCard key={post.id} post={post} index={idx} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
