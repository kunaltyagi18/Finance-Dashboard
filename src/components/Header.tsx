import { RoleToggle } from './RoleToggle';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <RoleToggle />
      </div>
    </header>
  );
};
