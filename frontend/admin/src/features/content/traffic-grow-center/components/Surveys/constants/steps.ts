interface IStep {
    content: string;
    placeholder?: string;
    type: string;
    optional: boolean;
    keyAttribute: string;
    list?: string[];
    buttonTitle?: string;
}
export const steps: IStep[] = [
    {
        content:
            "Welcome! I'm thrilled to help you explore collaboration opportunities. Let's start with the basics. What's your name?",
        placeholder: "Enter your name",
        type: "text",
        optional: true,
        keyAttribute: "fullName", // Matches IBasePersonalInfo.fullName
        buttonTitle: "Submit"
    },
    {
        content:
            "Great to meet you, asd! Now, could you please provide your email address?",
        placeholder: "your-email@example.com",
        type: "email",
        optional: true,
        keyAttribute: "email", // Matches IBasePersonalInfo.email
        buttonTitle: "Submit"
    },
    {
        content: "Thanks for that! Could you please share your phone number?",
        placeholder: "+123 456789",
        type: "tel",
        optional: false,
        keyAttribute: "phoneNumber", // Matches IBasePersonalInfo.phoneNumber
        buttonTitle: "Submit"
    },
    {
        content: "Awesome! Lastly, which country or location are you in?",
        placeholder: "Enter your country/location",
        type: "text",
        optional: false,
        keyAttribute: "location", // Matches IBasePersonalInfo.location.country
        buttonTitle: "Submit"
    },
    {
        content:
            "Thanks for sharing your location! Now, let's dive into your primary platform. Please select one of the following options:",
        type: "list",
        optional: true,
        keyAttribute: "location.city", // Primary Platform
        list: ["Website", "Instagram", "YouTube", "TikTok", "Blog", "Other"],
    },
    {
        content:
            "Great choice! Now, could you please provide the URL for your website?",
        placeholder: "https://example.com",
        type: "text",
        optional: false,
        keyAttribute: "website", // Platform URL/Handle
        buttonTitle: "Submit"
    },
    {
        content:
            "Thanks for sharing your website URL! Now, how many followers or subscribers do you have on your platform?",
        placeholder: "Enter the number of followers/subscribers",
        type: "text",
        optional: false,
        keyAttribute: "followers", // Number of Followers/Subscribers
        buttonTitle: "Submit"
    },
    {
        content:
            "That's fantastic! Now, could you let me know your estimated monthly website traffic?",
        placeholder: "e.g 500",
        type: "text",
        optional: false,
        keyAttribute: "monthlyTraffic", // Monthly Website Traffic (if applicable)
        buttonTitle: "Submit"
    },
    {
        content:
            "Thanks for sharing! Now, let’s move on to your niche and industry focus. Please select your main content category from the options below:",
        placeholder: "",
        type: "list",
        optional: true,
        keyAttribute: "contentCategory", // Main Content Category
        list: ["Tech", "Fashion", "Finance", "Health", "Gaming", "Other"],
    },
    {
        content:
            "Awesome! You're in the Tech category. Do you have any previous affiliate experience? If so, please share the names of brands you’ve collaborated with.",
        type: "boolean",
        optional: true,
        keyAttribute: "brandCollab-question", // Previous Affiliate Experience
    },
    {
        content: "Great! Which brands have you collaborated with?",
        placeholder: "Enter the brand names",
        type: "text",
        optional: false,
        keyAttribute: "brandCollab", // Brands You've Worked With Before (if any)
        buttonTitle: "Submit"
    },
    {
        content:
            "Thanks for sharing! If you have any proof of your experience, you can upload it now (like a screenshot or document).",
        type: "file",
        optional: false,
        keyAttribute: "file", // Upload proof (svg jpeg screenshot)
    },
    {
        content:
            "Thanks for uploading the file! Now, let’s talk about your affiliate preferences. What is your preferred commission type? You can choose from Flat Fee, % of Sales, or Hybrid.",
        type: "list",
        optional: false,
        keyAttribute: "commissionType", // Preferred Commission Type
        list: ["Flat Fee", "% of Sales", "Hybrid"],
    },
    {
        content:
            "Awesome choice! Now, could you specify the brand categories you are interested in working with?",
        placeholder: "e.g Tech, Fashion, Finance, Health, Gaming",
        type: "text",
        optional: false,
        keyAttribute: "brandCategories", // Preferred Brand Categories
        buttonTitle: "Submit"
    },
    {
        content:
            "Could you please let me know if you're open to sponsored content as well?",
        type: "boolean",
        optional: false,
        keyAttribute: "paymentInfo.agreedToTerms", // Willing to Do Sponsored Content?
    },
    {
        content:
            "Great! Now, how do you typically promote your affiliate links? Please select from the following options:",
        placeholder: "enter brand categories",
        type: "list",
        optional: false,
        keyAttribute: "typicallyPromote", // How Do You Promote Affiliate Links?
        list: ["Social Media", "Email Marketing", "Website", "Other"],
    },
    {
        content:
            "Thanks for sharing that! Now, let’s gather your payment and legal information. What is your preferred payment method?",
        placeholder: "enter brand categories",
        type: "list",
        optional: false,
        keyAttribute: "paymentMethod", // Preferred Payment Method
        list: ["PayPal", "Bank Transfer", "Crypto", "Other"],
    },
    {
        content:
            "Thank you for sharing your preferred payment method! Finally, do you agree to the terms and conditions? (Yes or No)",
        type: "boolean",
        optional: false,
        keyAttribute: "termsAndConditions", // Agree to Terms & Conditions?
    },
    {
        content:
            "Thank you so much for your time and for providing all this information! We're excited about the potential collaboration and will be in touch soon!",
        type: "end",
        optional: false,
        keyAttribute: "end", // end
        buttonTitle: "Complete" 
    }
];
