"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react';
import { toast } from "sonner"

function AddPlatform({children}:{children:React.ReactNode}) {

  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform, url }),
      });

      const data = await response.json();

      if (response.ok) {
        setPlatform('');
        setUrl('');
        toast.success(data.message)
        setOpen(false)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("An unexpected error occurred.")
    } finally {
      setLoading(false);
    }
  };

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Platform Name"
              className="col-span-3"
              required
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-left">
              Link
            </Label>
            <Input
              id="link"
              type="url"
              value={url}
              placeholder="Profile Link"
              className="col-span-3"
              required
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Platform Link'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPlatform