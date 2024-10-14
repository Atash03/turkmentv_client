// 'use client';

// import * as React from 'react';
// import * as DialogPrimitive from '@radix-ui/react-dialog';
// import { X } from 'lucide-react';

// import { cn } from '@/lib/utils';

// const Dialog = DialogPrimitive.Root;

// const DialogTrigger = DialogPrimitive.Trigger;

// const DialogPortal = DialogPrimitive.Portal;

// const DialogClose = DialogPrimitive.Close;

// const DialogOverlay = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Overlay
//     ref={ref}
//     className={cn(
//       'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
//       className,
//     )}
//     {...props}
//   />
// ));
// DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// const DialogContent = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
//   <DialogPortal>
//     <DialogOverlay />
//     <DialogPrimitive.Content
//       ref={ref}
//       className={cn(
//         'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
//         className,
//       )}
//       {...props}>
//       {children}
//       <DialogPrimitive.Close className="absolute right-0 top-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none ">
//         <svg
//           width="48"
//           height="48"
//           viewBox="0 0 48 48"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M25.46 24L31 29.54V31H29.54L24 25.46L18.46 31H17V29.54L22.54 24L17 18.46V17H18.46L24 22.54L29.54 17H31V18.46L25.46 24Z"
//             fill="#46464F"
//           />
//         </svg>
//         <span className="sr-only">Close</span>
//       </DialogPrimitive.Close>
//     </DialogPrimitive.Content>
//   </DialogPortal>
// ));
// DialogContent.displayName = DialogPrimitive.Content.displayName;

// const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn('flex flex-col text-center sm:text-left', className)} {...props} />
// );
// DialogHeader.displayName = 'DialogHeader';

// const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
//     {...props}
//   />
// );
// DialogFooter.displayName = 'DialogFooter';

// const DialogTitle = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Title
//     ref={ref}
//     className={cn('text-lightOnSurface text-heading5 leading-heading5 -tracking-[1%]', className)}
//     {...props}
//   />
// ));
// DialogTitle.displayName = DialogPrimitive.Title.displayName;

// const DialogDescription = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Description
//     ref={ref}
//     className={cn(
//       'text-lightOnSurfaceVariant text-textSmall leading-textSmall -tracking-[1%]',
//       className,
//     )}
//     {...props}
//   />
// ));
// DialogDescription.displayName = DialogPrimitive.Description.displayName;

// export {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogClose,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// };
