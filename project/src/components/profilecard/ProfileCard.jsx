import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

function ProfileCard({ name, headline, avatar, mutual }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">{headline}</p>
        {mutual && <p className="text-xs text-gray-400">{mutual} mutual connections</p>}
      </div>
      <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
        <AiOutlinePlus />
      </button>
    </div>
  );
}

export default ProfileCard;