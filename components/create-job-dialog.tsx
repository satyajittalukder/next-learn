import { Plus } from "lucide-react";
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "./ui/dialog"

import React from 'react'
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface CreateJobApplicationDialogueProps {
  boardId: string;
  columnId: string;
}

const CreateJobApplicationDialogue = ({ boardId, columnId }: CreateJobApplicationDialogueProps) => {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline"><Plus className="ml-2 h-4 w-4" /> Add Job </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Job Application</DialogTitle>
              <DialogDescription>
                Track a new job applicaton.
              </DialogDescription>
            </DialogHeader>
            <form action="" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" name="company" placeholder="Company Name" />
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" name="position" placeholder="Software Engineer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="Location" />
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary</Label>
                    <Input id="salary" name="salary" placeholder="Salary" />
                  </div>
                </div>
              </div>
            </form>
            {/* <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <Label htmlFor="username-1">Username</Label>
                <Input id="username-1" name="username" defaultValue="@peduarte" />
              </Field>
            </FieldGroup> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default CreateJobApplicationDialogue