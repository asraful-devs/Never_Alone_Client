# Never Alone Client (Bangla README)

Never Alone প্ল্যাটফর্মের আধুনিক ফ্রন্টএন্ড অ্যাপ। এখানে পাবলিক ল্যান্ডিং, ইভেন্ট ডিসকভারি, বুকিং সাক্সেস/ক্যানসেল পেজ, এবং অ্যাডমিন/হোস্ট/ইউজার ড্যাশবোর্ড সহ প্রয়োজনীয় সব UI ও মডিউল সাজানো হয়েছে।

## লিংকসমূহ

-   Client Live: https://never-alone-client.onrender.com/
-   Server Live: https://never-alone-server.onrender.com/
-   Client Repo: https://github.com/asraful-devs/Never_Alone_Client
-   Server Repo: https://github.com/asraful-devs/Never_Alone_Server

## টেক স্ট্যাক

-   Next.js 16 (App Router)
-   React 19 + TypeScript
-   TailwindCSS 4
-   Radix UI Primitives + কাস্টম UI কিট
-   Embla Carousel (ইন্টার‌্যাকটিভ স্লাইডার)

## ফোল্ডার স্ট্রাকচার (সংক্ষেপে)

-   `src/app`: অ্যাপ রাউটার ভিত্তিক পেজ, লেআউট, বুকিং রাউট
    -   `(commonLayout)`: পাবলিক লেআউট, `about-us`, `events`, `(auth)`
    -   `(dashboardLayout)`: প্রোটেক্টেড লেআউট, `admin`, `host`, `user`
    -   `booking/success`, `booking/cancel`
    -   `api/auth` (রাউট হ্যান্ডলার)
-   `src/components`: রিইউজেবল UI ও মডিউল কম্পোনেন্ট
    -   `common`: টেবিল/ডায়লগ/ফিল্টার/লট্টি/নাভবার/ফুটার/পেজ লোডার
    -   `modules`: ফিচার ভিত্তিক মডিউল (About, Admin, Auth, Dashboard, Events, Home, Host, MyProfile, User)
    -   `ui`: Radix ভিত্তিক UI কিট (accordion, dialog, dropdown, input, button, card, carousel ইত্যাদি)
-   `src/assets/lotties`: লট্টি অ্যানিমেশন ফাইল (login/register)
-   `src/hooks`: কাস্টম হুক (যেমন `useDebounce`)
-   `src/lib`: হেল্পার/ইউটিলস (auth-utils, formatters, serverFetchHelper, zodValidator)
-   `src/service`: API কল/সার্ভিস লেয়ার (admin, auth, booking, events, review)
-   `src/types`: TypeScript ইন্টারফেস (admin, event, host, user, dashboard ইত্যাদি)
-   `src/zod`: ফর্ম ভ্যালিডেশন স্কিমা (auth, booking, event, categories, host, review, user)
-   `public`: পাবলিক স্ট্যাটিক অ্যাসেটস

## ব্যবহৃত UI কম্পোনেন্টসমূহ (কিছু হাইলাইট)

-   `PublicNavbar`, `PublicFooter`: পাবলিক ন্যাভিগেশন ও ফুটার
-   `ManagementTable`, `TablePagination`, `TableSkeleton`: টেবিল ম্যানেজমেন্ট UI
-   `SearchFilter`, `SelectFilter`, `ClearFiltersButton`: সার্চ/ফিল্টার
-   `DeleteConfirmationDialog`, `alert-dialog`: কনফার্মেশন ও ডায়লগ
-   `ModeToggle`: থিম টগল
-   `LottieAnimation`, `LottiePlayer`: লট্টি অ্যানিমেশন প্লে
-   `EyeButton`, `LogoutButton`, `RefreshButton`: ইউটিলিটি অ্যাকশন
-   `carousel.tsx` (Embla): স্লাইডার/কারাউজেল
-   `input.tsx`, `field.tsx`, `label.tsx`: ফর্ম UI

## প্রধান ফিচার

-   পাবলিক ল্যান্ডিং: হিরো সেকশন, ব্যানার কারাউজেল, টপ ইভেন্টস
-   ইভেন্ট ব্রাউজিং: `/events`, `/events/[id]`
-   বুকিং ফ্লো: `booking/success`, `booking/cancel`
-   ড্যাশবোর্ড: `admin`, `host`, `user` ভিউস
-   ক্যারাউজেল ও ক্যাটাগরি ম্যানেজমেন্ট
-   রিইউজেবল UI কিট ও ফর্ম ভ্যালিডেশন (Zod)

## ইন্সটলেশন ও রান

প্রয়োজনীয়তা: Node.js (LTS), PNPM/NPM, একটি `.env` ফাইল (যদি সার্ভার API প্রয়োজন হয়)।

```bash
# ডিপেন্ডেন্সি ইন্সটল
pnpm install
# অথবা
npm install

# ডেভেলপমেন্ট সার্ভার
pnpm dev
# অথবা
npm run dev

# প্রোডাকশন বিল্ড
pnpm build && pnpm start
# অথবা
npm run build && npm start
```

## এনভায়রনমেন্ট ভ্যারিয়েবল (উদাহরণ)

-   `NEXT_PUBLIC_API_BASE_URL`: সার্ভার API বেস URL
-   অন্যান্য auth/route সম্পর্কিত কনফিগ `src/lib` ও `middleware.ts` দেখে কনফিগার করুন

## কোড গাইডলাইন

-   টাইপ সেফটি বজায় রাখতে `src/types` ব্যবহার করুন
-   ফর্ম ভ্যালিডেশনে `src/zod` স্কিমা ফলো করুন
-   সার্ভার কলের জন্য `src/service` ও `src/lib/serverFetchHelper.ts` ব্যবহার করুন
-   UI কম্পোনেন্টগুলো `src/components/ui` থেকে নিন; পুনঃব্যবহারযোগ্যতা বজায় রাখুন

## ডেপ্লয়মেন্ট

-   Render/Vercel এ সহজে ডেপ্লয় করা যায়
-   প্রোডাকশনে `next.config.ts` ও ক্যাশিং/ইমেজ/রিরাইট সেটআপ রিভিউ করুন

## কন্ট্রিবিউশন

-   Issue/PR খুলে আলোচনা করুন
-   কমিট মেসেজ পরিষ্কার রাখুন
-   লিন্ট (`eslint.config.mjs`) ও টাইপচেক (`tsconfig.json`) পাস নিশ্চিত করুন

## লাইসেন্স

প্রজেক্টের লাইসেন্স/ব্যবহার নীতিমালা রিপোতে উল্লেখিত থাকলে সেটি অনুসরণ করুন।
