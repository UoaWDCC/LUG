/* Constrains content width, centers it, and adds responsive horizontal padding. */

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}