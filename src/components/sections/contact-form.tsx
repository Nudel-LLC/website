"use client";

import { useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc/client";

export function ContactFormCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="sticky top-32 p-12 bg-white rounded-[40px] border border-gray-100 shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center">
          <MessageCircle size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase text-gray-900">
            Let&apos;s Talk
          </h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Get in touch
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <p className="text-lg font-bold text-gray-900 mb-2">
            お問い合わせありがとうございます。
          </p>
          <p className="text-gray-500 text-sm">
            内容を確認の上、担当者よりご連絡いたします。
          </p>
        </div>
      ) : (
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Name
            </label>
            <input
              type="text"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-gray-900 placeholder:text-gray-300 focus:border-gray-900 outline-none transition-all font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Email
            </label>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-gray-900 placeholder:text-gray-300 focus:border-gray-900 outline-none transition-all font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="HOW CAN WE HELP?"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-gray-900 placeholder:text-gray-300 focus:border-gray-900 outline-none transition-all font-bold resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-gray-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {mutation.isPending ? "Sending..." : "Send Inquiry"}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          {mutation.isError && (
            <p className="text-red-500 text-sm text-center">
              送信に失敗しました。もう一度お試しください。
            </p>
          )}
        </form>
      )}
    </div>
  );
}
