import React from "react";

export default function AnalyticsCard({ analytics }) {
  if (!analytics) return null;

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Link Analytics</h2>

      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-600">Short URL:</span>{" "}
          <a
            href={`/${analytics.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {window.location.origin}/{analytics.shortCode}
          </a>
        </div>

        <div>
          <span className="font-medium text-gray-600">Original URL:</span>{" "}
          <span className="text-gray-800">{analytics.originalUrl}</span>
        </div>

        <div>
          <span className="font-medium text-gray-600">Created:</span>{" "}
          <span className="text-gray-800">
            {new Date(analytics.createdAt).toLocaleString()}
          </span>
        </div>

        {analytics.expiresAt && (
          <div>
            <span className="font-medium text-gray-600">Expires:</span>{" "}
            <span className="text-gray-800">
              {new Date(analytics.expiresAt).toLocaleString()}
            </span>
          </div>
        )}

        <div>
          <span className="font-medium text-gray-600">Clicks:</span>{" "}
          <span className="text-gray-800">{analytics.clickCount}</span>
        </div>
      </div>
    </div>
  );
}
