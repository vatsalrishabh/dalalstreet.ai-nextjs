# 🧠 DalalStreet.ai - Frontend Overview

## 📍 Project Overview

This is the frontend of **DalalStreet.ai**, built with **Next.js**. It provides a responsive and dynamic UI, tightly integrated with **Google OAuth authentication**, Redux state management, and conditional rendering for protected routes.

---

## 🔭 Bird’s Eye View

### 🧩 Tech Stack
- **Framework**: Next.js (App Router or Pages Router depending on config)
- **Styling**: TailwindCSS / MUI (as applicable)
- **State Management**: Redux
- **Auth**: Google OAuth2 via custom provider
- **Routing**: Handled via Next.js dynamic routing

---

## 🧑‍💻 User Story

When a user visits **[dalastreet.ai](https://dalastreet.ai)**, the application workflow begins like this:

1. **Initial Load**:
   - The root layout file (`layout.tsx`) wraps the entire application.
   - Inside this layout, a `GoogleOAuthProvider` (`@/provider/GoogleOAuth.tsx`) is used to wrap all child components.

2. **Authentication Check**:
   - The auth state is accessed using Redux:
     ```ts
     const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
     ```
   - Based on this `isAuthenticated` boolean, the app conditionally renders one of two things:
     - If **not authenticated**: Renders the login/signup UI from `@/components/login/LoginSignup`.
     - If **authenticated**: Renders the rest of the application passed as `children` props in `layout.tsx`.

3. **Layout Wrapping**:
   - The `layout.tsx` acts as a global wrapper where:
     ```tsx
  <ReduxProvider>
          <DaisyUiThemeProvider>
            <GoogleOAuth>
            <SessionHandler />   {/* automatic logoout if the firebase token expires */}
               <ToastContainer position="top-right" autoClose={3000} />
            {children}
            </GoogleOAuth>
          </DaisyUiThemeProvider>
        </ReduxProvider>
     ```

---

## 🧱 Folder Structure (relevant parts)

## 🔐 Authentication & Session Management

### 🧾 SessionHandler.tsx

- Located at: `@/components/SessionHandler.tsx`
- This component is rendered inside `layout.tsx` and plays a **critical role in managing user sessions**.

### 🚀 What it Does:

1. **Listens to Firebase Token Changes**:
   - Uses `onIdTokenChanged()` from Firebase to detect changes in the user's ID token.
   - Automatically re-generates a new Google Auth token **when the old one expires**.

2. **Rehydrates Redux on Refresh**:
   - On first render, it reads from `localStorage`:
     - If `token` and `userDetails` exist, it dispatches the `login` action to populate the Redux state.
   - Ensures that even after a full page reload, the user stays logged in if valid data is in `localStorage`.

3. **Auto Updates Token & Redux**:
   - When a new token is issued by Firebase, it's:
     - Stored in `localStorage`
     - Updated in the Redux store by dispatching `login({ user, token })`

4. **Handles Logout Cleanly**:
   - If `firebaseUser` is null, it:
     - Dispatches `logout()` to Redux
     - Clears user data from `localStorage`

### ✅ Used in: `layout.tsx`

- `SessionHandler` is rendered globally through `layout.tsx`, so it’s always active in the app.
- This ensures **global session monitoring**, seamless **auto-refresh of expired tokens**, and consistent **Redux/localStorage sync** for authenticated state.

```tsx
```
 <ReduxProvider>
          <DaisyUiThemeProvider>
            <GoogleOAuth>
            <SessionHandler />   {/* automatic logoout if the firebase token expires */}
               <ToastContainer position="top-right" autoClose={3000} />
            {children}
            </GoogleOAuth>
          </DaisyUiThemeProvider>
        </ReduxProvider>
```

