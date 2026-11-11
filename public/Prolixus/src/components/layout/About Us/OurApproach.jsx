// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";
// export default function OurApproach() {
//   return (
//     <section className="relative bg-white py-24">
//       <div className="container mx-auto px-6">
//         {/* Header */}
//         <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
//           <div>
//             <FaderInAnimation direction="up"> 
//             <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
//               <span className="h-2 w-2 rounded-full bg-accent text-primary " />
//               Our Approach
//             </p>
//             </FaderInAnimation>

//              <RevealInAnimation direction="left" delay={0.01}>
//             <h2 className="text-primary text-4xl font-semibold leading-tight lg:text-5xl">
//               A thoughtful process{" "}
//               <span className="font-accent italic font-normal">
//                 from <br /> seed to essence
//               </span>
//             </h2>
//             </RevealInAnimation>
//           </div>

//           <div className="flex items-center">
//             <FaderInAnimation direction="up">
//             <p className="text-text max-w-xl text-base leading-relaxed">
//               We believe that every drop matters. Our premium oil dropper bottles
//               are designed to deliver purity, precision, and care with every use.
//             </p>
//             </FaderInAnimation>
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           <FaderInAnimation direction="up">
//           <ApproachCard
//             title="Our Mission"
//             text="Carefully sourced, 100%, rigorously tested for excellence."
//             icon="/images/icon-our-mission.svg"
//             img="/images/our-mission-img.jpg"
//           />
//           </FaderInAnimation>

//           <FaderInAnimation direction="up">
//           <ApproachCard
//             title="Our Vision"
//             text="Carefully sourced, 100%, rigorously tested for excellence."
//             icon="/images/icon-our-vision.svg"
//             img="/images/our-vision-img.jpg"
//           />
//           </FaderInAnimation>

//           <FaderInAnimation direction="up">
//           <ApproachCard
//             title="Our Goal"
//             text="Carefully sourced, 100%, rigorously tested for excellence."
//             icon="/images/icon-our-goal.svg"
//             img="/images/our-goal-img.jpg"
//           />
//           </FaderInAnimation>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ApproachCard({ title, text, img, icon }) {
//   return (
//     <div className="rounded-2xl border border-divider bg-white p-8 transition hover:shadow-lg">
//       <h3 className="text-primary mb-2 text-lg font-semibold">{title}</h3>

//       <p className="text-text mb-6 text-sm leading-relaxed">{text}</p>

//       {/* Image */}
//       <div className="relative overflow-hidden rounded-xl">
//         <img
//           src={img}
//           alt={title}
//           className="aspect-334/178 w-full object-cover"
//         />

//         {/* Icon Badge */}
//         <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
//           <img src={icon} alt="" className="h-6 w-6" />
//         </div>
//       </div>
//     </div>
//   );
// }
